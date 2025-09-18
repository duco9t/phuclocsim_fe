"use client";

import AccountInfo from "@/components/account/AccountInfo";
import AccountTabs from "@/components/account/AccountTabs";
import FeedbackForm from "@/components/account/FeedbackForm";
import FeedbackList from "@/components/account/FeedbackList";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export default function AccountPage() {
    const { user } = useAuth(); // user chỉ có thông tin cơ bản
    const [activeTab, setActiveTab] = useState("info");
    const [reloadFlag, setReloadFlag] = useState(0);
    const [fullUser, setFullUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?._id) {
            fetch(`http://localhost:3009/api/user/getuser/${user._id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setFullUser(data.data);
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                Bạn chưa đăng nhập.
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                Đang tải thông tin...
            </div>
        );
    }

    if (!fullUser) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                Không tìm thấy thông tin tài khoản.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Tài khoản của bạn
                </h1>

                <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === "info" && <AccountInfo user={fullUser} />}
                {activeTab === "feedback" && (
                    <div className="space-y-6">
                        <FeedbackForm
                            user={user}
                            onSubmitted={() => setReloadFlag((prev: number) => prev + 1)} // ✅ fix
                        />
                        <FeedbackList user={user} reloadFlag={reloadFlag} />
                    </div>
                )}
            </div>
        </div>
    );
}
