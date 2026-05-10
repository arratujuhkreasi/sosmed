# Contributing to Horror Content App

Terima kasih atas minat Anda untuk berkontribusi pada Horror Content App! Kami menyambut kontribusi dari siapa saja.

## Cara Berkontribusi

### 1. Fork Repository

Fork repository ini ke akun GitHub Anda.

### 2. Clone Repository

```bash
git clone https://github.com/your-username/horror-content-app.git
cd horror-content-app
```

### 3. Buat Branch Baru

```bash
git checkout -b feature/nama-fitur-anda
```

Naming convention untuk branch:
- `feature/` untuk fitur baru
- `fix/` untuk bug fixes
- `docs/` untuk dokumentasi
- `refactor/` untuk refactoring code

### 4. Lakukan Perubahan

Pastikan code Anda:
- Mengikuti style guide yang ada
- Memiliki komentar yang jelas jika diperlukan
- Tidak merusak fitur yang sudah ada
- Telah ditest dengan baik

### 5. Commit Changes

```bash
git add .
git commit -m "feat: menambahkan fitur X"
```

Gunakan conventional commits:
- `feat:` untuk fitur baru
- `fix:` untuk bug fixes
- `docs:` untuk perubahan dokumentasi
- `style:` untuk formatting
- `refactor:` untuk refactoring
- `test:` untuk menambah tests
- `chore:` untuk maintenance

### 6. Push ke GitHub

```bash
git push origin feature/nama-fitur-anda
```

### 7. Buat Pull Request

Buat Pull Request dari branch Anda ke branch `main` repository utama.

## Code Style Guidelines

### JavaScript/React

- Gunakan ES6+ syntax
- Gunakan functional components dengan hooks
- Gunakan camelCase untuk variable dan function names
- Gunakan PascalCase untuk component names
- Indent dengan 2 spaces
- Gunakan semicolons
- Gunakan single quotes untuk strings

### CSS

- Gunakan kebab-case untuk class names
- Organize properties alphabetically
- Gunakan CSS variables untuk colors dan spacing

### Backend

- Gunakan async/await untuk asynchronous operations
- Proper error handling dengan try/catch
- Validate input data
- Use meaningful variable names

## Testing

Sebelum submit PR, pastikan:

1. Backend berjalan tanpa error
```bash
cd backend
npm run dev
```

2. Frontend berjalan tanpa error
```bash
cd frontend
npm start
```

3. Test semua fitur yang Anda ubah/tambahkan

## Pull Request Guidelines

### PR Title

Gunakan format: `[Type] Brief description`

Contoh:
- `[Feature] Add content analytics dashboard`
- `[Fix] Resolve login authentication issue`
- `[Docs] Update API documentation`

### PR Description

Sertakan:

1. **Deskripsi**: Apa yang diubah dan mengapa
2. **Tipe Perubahan**: Feature, Bug Fix, Documentation, dll
3. **Testing**: Bagaimana Anda test perubahan ini
4. **Screenshots**: Jika ada perubahan UI
5. **Breaking Changes**: Jika ada

Template:
```markdown
## Deskripsi
Brief description of changes

## Tipe Perubahan
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested this

## Screenshots (jika ada)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

## Reporting Bugs

Gunakan GitHub Issues untuk report bugs.

Sertakan:
- Deskripsi bug yang jelas
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots jika memungkinkan
- Environment (OS, Browser, Node version)

## Feature Requests

Gunakan GitHub Issues dengan label `enhancement`.

Sertakan:
- Deskripsi fitur yang jelas
- Use case
- Mockups jika ada
- Alternatif yang sudah dipertimbangkan

## Questions?

Jika ada pertanyaan, silakan:
- Buka GitHub Issue dengan label `question`
- Atau hubungi maintainers

## Code of Conduct

### Our Pledge

Kami berkomitmen untuk membuat partisipasi dalam project ini bebas dari harassment untuk semua orang.

### Our Standards

- Gunakan bahasa yang welcoming dan inclusive
- Hormati pandangan dan pengalaman yang berbeda
- Terima kritik konstruktif dengan baik
- Focus pada yang terbaik untuk komunitas
- Tunjukkan empati kepada anggota komunitas lain

### Unacceptable Behavior

- Trolling, insulting/derogatory comments
- Public atau private harassment
- Publishing others' private information
- Conduct yang tidak profesional

## License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah MIT License.

## Terima Kasih!

Terima kasih telah meluangkan waktu untuk berkontribusi! 🎃
