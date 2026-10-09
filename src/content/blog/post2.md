---
title: "Quản lý tài sản IT bằng GLPI: cấu trúc triển khai thực tế"
description: "Cách tổ chức GLPI để quản lý máy tính, thiết bị mạng, vị trí, phòng ban, trạng thái và lịch sử tài sản dễ tra cứu."
pubDate: "Oct 08 2026"
heroImage: "/post_img.webp"
badge: "GLPI"
tags: ["glpi", "asset", "it"]
---

GLPI hiệu quả nhất khi dữ liệu được chuẩn hóa ngay từ đầu. Nếu chỉ nhập tên thiết bị mà không thống nhất vị trí, trạng thái và đơn vị sử dụng thì sau một thời gian dữ liệu sẽ rất khó tra cứu.

## Nhóm thông tin nên chuẩn hóa

- **Entity:** công ty, đơn vị hoặc chi nhánh.
- **Location:** tòa nhà, tầng, phòng hoặc khu vực.
- **Status:** đang sử dụng, dự phòng, hỏng, sửa chữa, thanh lý.
- **Manufacturer / Model:** hãng và model thiết bị.
- **User / Group:** người hoặc bộ phận đang sử dụng.
- **Network information:** IP, MAC, VLAN và kết nối liên quan khi cần.

## Thiết bị nên quản lý

GLPI có thể dùng cho máy tính, server, switch, access point, camera, đầu ghi, màn hình, máy in và nhiều loại tài sản khác.

Điểm quan trọng là **mỗi tài sản chỉ có một bản ghi chuẩn**, có lịch sử thay đổi và có thể truy ra ai đang giữ, đang ở đâu và trạng thái hiện tại là gì.

## Gợi ý vận hành

Nên kiểm kê định kỳ và sử dụng agent hoặc cơ chế tự động thu thập thông tin với các thiết bị hỗ trợ. Những thiết bị không thể tự đồng bộ thì cần quy trình cập nhật thủ công rõ ràng.
