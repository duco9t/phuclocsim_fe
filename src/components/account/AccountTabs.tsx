"use client";

type Props = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
};

export default function AccountTabs({ activeTab, setActiveTab }: Props) {
    const tabs = [
        { id: "info", label: "Thông tin tài khoản" },
        { id: "feedback", label: "Đánh giá dịch vụ" },
    ];

    return (
        <div className="flex border-b mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 text-center font-medium transition-colors cursor-pointer ${activeTab === tab.id
                            ? "border-b-2 border-yellow-500 text-yellow-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
