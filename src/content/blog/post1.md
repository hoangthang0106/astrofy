---
title: "Tách VLAN khách trên UniFi: nguyên tắc triển khai an toàn"
description: "Ghi chú ngắn về cách tách mạng Wi-Fi khách khỏi các VLAN nội bộ và các điểm cần kiểm tra trước khi đưa vào sử dụng."
pubDate: "Oct 09 2026"
heroImage: "/post_img.webp"
badge: "NETWORK"
tags: ["unifi", "vlan", "network"]
---

Một mạng Wi-Fi khách nên được xem là **mạng không tin cậy** và tách khỏi các hệ thống nội bộ ngay từ đầu. Mục tiêu chính là khách vẫn ra Internet bình thường nhưng không thể truy cập server, camera, máy in, NAS hoặc các VLAN nghiệp vụ.

## Nguyên tắc triển khai

- Tạo một VLAN riêng dành cho khách.
- Tạo subnet và DHCP riêng cho VLAN đó.
- Gán SSID Guest vào đúng VLAN.
- Chặn lưu lượng từ Guest VLAN đến các mạng nội bộ.
- Chỉ cho phép DNS, DHCP và Internet cần thiết.
- Bật client isolation nếu mô hình sử dụng yêu cầu các thiết bị khách không nhìn thấy nhau.

## Kiểm tra sau khi cấu hình

Dùng một thiết bị thử kết nối Wi-Fi khách và xác nhận:

1. Nhận đúng IP của VLAN khách.
2. Truy cập Internet bình thường.
3. Không ping/truy cập được gateway, server và thiết bị ở các VLAN nội bộ ngoài các dịch vụ được phép.
4. DNS hoạt động đúng.
5. Không có route hoặc firewall rule nào vô tình mở ngược vào mạng nội bộ.

Việc tách VLAN nên được kiểm tra thực tế bằng một máy khách, không chỉ nhìn cấu hình trên controller.
