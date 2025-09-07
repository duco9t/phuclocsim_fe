"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button3 } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function SimForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("🎉 Gửi form thành công! Cảm ơn bạn, kết quả sẽ được gửi sớm.");
    }, 1500);
  };

  return (
    <div className="px-4 pb-20">
      <Card className="relative w-full max-w-2xl mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle>Luận Sim Phong Thủy</CardTitle>
          <CardDescription>
            Điền thông tin để nhận kết quả phân tích nhanh chóng
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Thông tin khách hàng */}
            <div className="space-y-2">
              <Label>Họ và tên</Label>
              <Input placeholder="Nguyễn Văn A" required />
            </div>
            <div className="space-y-2">
              <Label>Ngày tháng năm sinh</Label>
              <Input type="date" required />
            </div>
            <div className="space-y-2">
              <Label>Số CCCD</Label>
              <Input placeholder="012345678901" />
            </div>

            {/* Thông tin sim hiện tại */}
            <div className="space-y-2">
              <Label>Danh sách số điện thoại đang dùng</Label>
              <Textarea placeholder="Nhập các số điện thoại bạn đang sử dụng" />
            </div>
            <div className="space-y-2">
              <Label>Thời gian đã dùng từng số</Label>
              <Textarea placeholder="VD: 0909xxxxxx - 3 năm" />
            </div>

            {/* Nhu cầu */}
            <div>
              <Label className="mb-2 block">Nhu cầu</Label>
              <RadioGroup defaultValue="xem-sim">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="xem-sim" id="xem-sim" />
                  <Label htmlFor="xem-sim">Xem phong thủy sim đang dùng</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="thiet-ke" id="thiet-ke" />
                  <Label htmlFor="thiet-ke">Thiết kế sim mới</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Mục tiêu chính */}
            <div>
              <Label className="mb-2 block">Mục tiêu chính</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="kinh-doanh" />
                  <Label htmlFor="kinh-doanh">Kinh doanh – Công việc</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tinh-duyen" />
                  <Label htmlFor="tinh-duyen">Tình duyên – Gia đạo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tai-loc" />
                  <Label htmlFor="tai-loc">Tài lộc – May mắn</Label>
                </div>
              </div>
            </div>

            {/* Cách nhận kết quả */}
            <div>
              <Label className="mb-2 block">Cách nhận kết quả nhanh</Label>
              <RadioGroup defaultValue="zalo">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="zalo" id="zalo" />
                  <Label htmlFor="zalo">Zalo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button3 type="submit" disabled={loading}>
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </Button3>
          </CardFooter>
        </form>

        {/* Border Animation */}
        <BorderBeam
          duration={6}
          size={400}
          className="from-transparent via-red-500 to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          borderWidth={2}
          className="from-transparent via-blue-500 to-transparent"
        />
      </Card>
    </div>
  );
}
