"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Mở rộng User type để match với API response
type User = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    vai_tro?: number;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    password?: string; // Không nên lưu, nhưng API trả về
};

type AuthContextType = {
    user: User | null;
    login: (data: User) => void;
    logout: () => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load từ localStorage khi khởi tạo
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                console.log("Loaded user from localStorage:", parsedUser);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            localStorage.removeItem("user");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = (data: User) => {
        console.log("Logging in user:", data);
        
        // Loại bỏ password trước khi lưu (bảo mật)
        const { password, ...userWithoutPassword } = data;
        
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};