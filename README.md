# Hoàng Thắng — Personal Website

Website cá nhân về **IT Infrastructure, Network, Server, Camera, Monitoring và Automation**.

## Nội dung

- Trang chủ
- Dự án & lĩnh vực
- Blog / ghi chú kỹ thuật
- Kinh nghiệm & kỹ năng
- RSS feed

## Công nghệ

- Astro
- TailwindCSS
- DaisyUI
- Markdown Content Collections

## Chạy local

Yêu cầu Node.js 20+ và pnpm 8+.

```bash
pnpm install
pnpm dev
```

Mở địa chỉ Astro hiển thị trong terminal, mặc định là:

```text
http://localhost:4321
```

## Build production

```bash
pnpm build
pnpm preview
```

Thư mục build:

```text
dist/
```

Đây là **static website**, phù hợp để deploy lên Cloudflare Pages, GitHub Pages, Netlify hoặc Vercel; không cần VPS/Node process chạy 24/7.

### Biến môi trường khi deploy

- `SITE_URL`: URL public của website, ví dụ `https://example.com`
- `BASE_PATH`: chỉ cần khi website chạy dưới subpath, ví dụ `/astrofy` trên GitHub Pages

## GitHub

https://github.com/hoangthang0106/astrofy

## License / Credits

Dự án được tùy biến từ [Astrofy](https://github.com/manuelernestog/astrofy), phát hành theo MIT License. Xem file `LICENSE`.
