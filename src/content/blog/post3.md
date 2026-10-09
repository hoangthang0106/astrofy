---
title: "Giám sát website và server bằng Uptime Kuma"
description: "Thiết lập monitoring cơ bản cho website, port dịch vụ và server với cảnh báo khi hệ thống mất kết nối."
pubDate: "Oct 07 2026"
heroImage: "/post_img.webp"
badge: "MONITORING"
tags: ["uptime-kuma", "monitoring", "server"]
---

Uptime Kuma là lựa chọn nhẹ để theo dõi trạng thái website và nhiều dịch vụ mạng. Với một hệ thống nhỏ, chỉ cần vài monitor đúng loại đã giúp phát hiện sự cố sớm hơn nhiều so với chờ người dùng báo lỗi.

## Các monitor cơ bản

- **HTTP(s):** kiểm tra website hoặc API.
- **Ping:** kiểm tra một IP có còn phản hồi.
- **TCP Port:** kiểm tra một dịch vụ có đang lắng nghe trên port cần thiết.
- **DNS:** kiểm tra phân giải tên miền.
- **Push:** phù hợp với máy nằm sau NAT hoặc trong mạng nội bộ.

## Thiết lập thực tế

Với các dịch vụ quan trọng có thể kiểm tra mỗi 60 giây. Những dịch vụ ít quan trọng hơn nên dùng chu kỳ dài hơn để giảm tải.

Khi cấu hình notification, nên gửi cảnh báo cả lúc **DOWN** và khi **UP trở lại** để biết hệ thống đã phục hồi.

## Một lưu ý quan trọng

Không nên đặt toàn bộ hệ thống giám sát và dịch vụ cần giám sát trên cùng một máy hoặc cùng một nền tảng. Nếu nền tảng đó mất hoàn toàn, hệ thống giám sát cũng sẽ mất theo và không thể gửi cảnh báo.
