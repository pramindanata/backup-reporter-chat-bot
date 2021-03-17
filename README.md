# README

`backup-chat-bot` merupakan program yang bertugas untuk mengirimkan notifikasi laporan hasil proses backup kepada pengguna melalui chat bot Telegram.

## Other

Arsitektur program mengikuti [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). Detail struktur folder:

- `entites`: Berisikan entitas bisnis program.
- `app`: Berisikan *use case* atau logika proses bisnis program.
- `adapters`: Berisikan kode *controller* dari program.
- `infra`: Berisikan kode infrastruktur dari program seperti DB, REST, dan service eksternal.
