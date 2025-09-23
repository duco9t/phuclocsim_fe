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

  // State cho từng field
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cccd, setCccd] = useState("");
  const [simsText, setSimsText] = useState(""); // VD: "0909xxxxxx - 36\n0912yyyyyy - 12"
  const [nhuCau, setNhuCau] = useState("xem-sim");
  const [mucTieu, setMucTieu] = useState<string[]>([]);
  const [fastResultMethod, setFastResultMethod] = useState("zalo");
  const [meetingType, setMeetingType] = useState("NONE");
  const [meetingTime, setMeetingTime] = useState("");
  const [note, setNote] = useState("");

  const VALID_MUC_TIEU = [
    "KINH_DOANH_CONG_VIEC",
    "TINH_DUYEN_GIA_DAO",
    "TAI_LOC_MAY_MAN",
  ] as const;

  const toggleMucTieu = (value: string) => {
    if (!VALID_MUC_TIEU.includes(value as any)) return; // chặn giá trị rác
    setMucTieu((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mucTieu.length === 0) {
      alert("Vui lòng chọn ít nhất một mục tiêu.");
      return;
    }
    setLoading(true);

    try {
      // Parse sims: mỗi dòng "số - số tháng"
      const sims = simsText
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const [phoneNumber, duration] = line.split("-").map((s) => s.trim());
          return {
            phoneNumber,
            usedDurationMonths: duration ? parseInt(duration, 10) : null,
          };
        });

      // Map giá trị theo enum backend
      const nhuCauEnum = nhuCau === "XEM_SIM" || nhuCau === "THIET_KE_SIM_MOI" ? nhuCau : (nhuCau.toUpperCase().replace(/-/g, "_") as any);
      const fastEnum = fastResultMethod === "ZALO" || fastResultMethod === "SMS" || fastResultMethod === "EMAIL" ? fastResultMethod : (fastResultMethod.toUpperCase() as any);

      const body = {
        fullName,
        birthDate,
        cccd,
        sims,
        nhuCau: nhuCauEnum,
        mucTieu,
        fastResultMethod: fastEnum,
        meetingType,
        meetingTime: meetingTime || null,
        note,
      };

      const res = await fetch("http://localhost:3009/api/request/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Lỗi gửi request");
      }

      alert("Gửi form thành công!");
    } catch (err: any) {
      alert("Lỗi: " + err.message);
    } finally {
      setLoading(false);
    }
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
              <Label>
                Họ và tên <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Nguyễn Văn A"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>
                Ngày tháng năm sinh <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>
                Số CCCD <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                maxLength={12}
                placeholder="012345678901"
                required
                value={cccd}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, ""); // xoá hết ký tự không phải số
                  setCccd(onlyNums);
                }}
              />
            </div>

            {/* Thông tin sim hiện tại */}
            <div className="space-y-2">
              <Label>
                Danh sách số điện thoại (số - số tháng đã dùng){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder={`VD:\n0909xxxxxx - 36\n0912yyyyyy - 12`}
                required
                value={simsText}
                onChange={(e) => setSimsText(e.target.value)}
              />
            </div>

            {/* Nhu cầu */}
            <div>
              <Label className="mb-2 block">Nhu cầu</Label>
              <RadioGroup value={nhuCau} onValueChange={setNhuCau}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="XEM_SIM" id="xem-sim" />
                  <Label htmlFor="xem-sim">Xem phong thủy sim đang dùng</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="THIET_KE_SIM_MOI" id="thiet-ke" />
                  <Label htmlFor="thiet-ke">Thiết kế sim mới</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Mục tiêu chính */}
            <div>
              <Label className="mb-2 block">Mục tiêu chính<span className="text-red-500">*</span></Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="kinh-doanh"
                    checked={mucTieu.includes("KINH_DOANH_CONG_VIEC")}
                    onCheckedChange={() => toggleMucTieu("KINH_DOANH_CONG_VIEC")}
                  />
                  <Label htmlFor="kinh-doanh">Kinh doanh – Công việc</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tinh-duyen"
                    checked={mucTieu.includes("TINH_DUYEN_GIA_DAO")}
                    onCheckedChange={() => toggleMucTieu("TINH_DUYEN_GIA_DAO")}
                  />
                  <Label htmlFor="tinh-duyen">Tình duyên – Gia đạo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tai-loc"
                    checked={mucTieu.includes("TAI_LOC_MAY_MAN")}
                    onCheckedChange={() => toggleMucTieu("TAI_LOC_MAY_MAN")}
                  />
                  <Label htmlFor="tai-loc">Tài lộc – May mắn</Label>
                </div>
              </div>
            </div>

            {/* Cách nhận kết quả */}
            <div>
              <Label className="mb-2 block">Cách nhận kết quả nhanh</Label>
              <RadioGroup value={fastResultMethod} onValueChange={(val) => setFastResultMethod(val)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ZALO" id="zalo" />
                  <Label htmlFor="zalo">Zalo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SMS" id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="EMAIL" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Meeting Type */}
            <div className="space-y-2">
              <Label>Hình thức gặp mặt</Label>
              <select
                className="border p-2 rounded w-full"
                value={meetingType}
                onChange={(e) => setMeetingType(e.target.value)}
              >
                <option value="NONE">Không cần</option>
                <option value="ZOOM">Zoom</option>
              </select>
            </div>

            {/* Meeting Time */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Thời gian hẹn (nếu có)
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="date"
                  value={meetingTime ? meetingTime.split("T")[0] : ""}
                  onChange={(e) =>
                    setMeetingTime(
                      e.target.value
                        ? `${e.target.value}T${meetingTime.split("T")[1] || "09:00"}`
                        : ""
                    )
                  }
                />
                <Input
                  type="time"
                  value={meetingTime ? meetingTime.split("T")[1] : ""}
                  onChange={(e) =>
                    setMeetingTime(
                      meetingTime
                        ? `${meetingTime.split("T")[0]}T${e.target.value}`
                        : `2025-01-01T${e.target.value}`
                    )
                  }
                />
              </div>
              <p className="text-sm text-gray-500">
                📅 Chọn ngày & giờ mong muốn, hoặc để trống nếu không cần.
              </p>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <Label>Ghi chú thêm</Label>
              <Textarea
                placeholder="Ghi chú mong muốn khác..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <p className="text-sm text-gray-500 mb-4">
                📝 Nếu chọn nhận kết quả qua Zalo, SMS hoặc Email vui lòng nhập tại đây.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button3 type="submit" disabled={loading}>
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </Button3>
          </CardFooter>
        </form>

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
