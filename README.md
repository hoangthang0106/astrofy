# Hoàng Quốc Thắng — Website cá nhân

Website tiếng Việt giới thiệu bản thân, lĩnh vực làm việc và ghi chú kỹ thuật. Được tùy biến từ Astrofy, sử dụng Astro, TailwindCSS và DaisyUI.

## Cài qua Portainer

1. **Stacks → Add stack → Repository**.
2. Repository URL: `https://github.com/hoangthang0106/astrofy`.
3. Repository reference: `refs/heads/main`.
4. Compose path: `compose.yaml`.
5. Trong Environment variables, đặt `SITE_URL` thành URL public thực tế của web (bao gồm `https://`). Khi thử trong LAN có thể dùng URL LAN thực tế.
6. Deploy stack. Mở `http://IP-UBUNTU:8088`.

Docker build tải thư viện và build web một lần; container chạy bằng user không phải root. Không cần database. Cần kết nối Internet trong lúc build. Nếu Portainer chạy Swarm, cần build/push image trước; Compose này dành cho Docker Standalone.

Để mở từ xa: thêm route HTTP trong Cloudflare Tunnel tới `IP-UBUNTU:8088`, dùng hostname đã chọn trong SITE_URL. Không dùng tên miền quản trị Portainer cho website.

Khi sửa code: cập nhật stack từ GitHub và bật tùy chọn rebuild image nếu giao diện có. Nếu chỉ restart container, nội dung sẽ không được build lại.

## Sửa nội dung

- `src/pages/index.astro`: trang chủ.
- `src/pages/cv.astro`: giới thiệu bản thân.
- `src/pages/projects.astro`: lĩnh vực và công nghệ.
- `src/content/blog/`: ghi chú Markdown.
- `src/config.ts`: tên và mô tả web.

Không đưa tài khoản, mật khẩu, IP nội bộ hay cấu hình doanh nghiệp lên repo công khai. Thông tin liên hệ hiện dùng GitHub; chưa khai báo số điện thoại/email cá nhân.

## Chạy và kiểm tra local

Node.js 22, pnpm 8.15.9:

```sh
corepack enable
corepack prepare pnpm@8.15.9 --activate
pnpm install --frozen-lockfile
pnpm dev
pnpm build
node server.mjs
```

Server nhận PORT hoặc SERVER_PORT (mặc định 4321), có `/healthz` và trang 404. SITE_URL và BASE_PATH là biến **lúc build**; đổi giá trị cần build lại.

## License

MIT. Gốc: https://github.com/manuelernestog/astrofy. Giữ thông tin bản quyền trong LICENSE.
