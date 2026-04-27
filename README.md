# 🖥️ Turing Machine Visualizer

An interactive, browser-based Turing Machine simulator built as part of my **Theory of Computing** coursework at the **University of Moratuwa**. Originally designed to recognize a specific formal language, this project is open for collaboration — feel free to extend it for other languages or features!

## 🔗 Live Demo
👉 https://Thilaksan8.github.io/turing-machine-visualizer

---

## 📖 Background

This visualizer was built to support my understanding of Turing Machines for the language:

**L = { aⁿ b³ⁿ cᵐ | n ≥ 1, m ≥ 0 }**

Which means: *n* copies of `a`, followed by exactly *3n* copies of `b`, followed by any number of `c`s.

| Input | Result |
|-------|--------|
| `abbb` | ✅ Accepted |
| `aabbbbbb` | ✅ Accepted |
| `abbbcc` | ✅ Accepted |
| `abb` | ❌ Rejected |
| `aba` | ❌ Rejected |

---

## ✨ Features

- 🎬 Step-by-step tape animation
- ⚡ Adjustable simulation speed
- 🧪 Preset valid and invalid examples
- ✏️ Custom input support
- 📊 Live state and transition display
- 📱 Responsive design

---

## 🚀 Getting Started

No installation needed. Just open `index.html` in your browser.

```bash
git clone https://github.com/Thilaksan8/turing-machine-visualizer.git
cd turing-machine-visualizer
open index.html   # or double-click it on Windows
```

---

## 🤝 Contributing

Contributions are welcome! This project was built for one specific language, but it can easily be extended.

**Ideas for contribution:**
- Add support for other Turing Machine languages
- Add a state diagram view
- Add transition table display
- Improve mobile layout
- Add more example inputs

**How to contribute:**
1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit (`git commit -m "feat: describe your change"`)
5. Push (`git push origin feature/your-feature`)
6. Open a Pull Request

---

## 📁 Project Structure

```
turing-machine-visualizer/
├── index.html       # Main UI structure
├── style.css        # Styling and layout
├── tm.js            # Turing Machine logic & transitions
├── visualizer.js    # Tape rendering & controls
└── README.md        # You are here
```

If you want to contribute or modify the project, here is what each file does:

- **`index.html`** — The main page. Contains all the buttons, tape display, input box and layout. Start here if you want to change the UI structure.
- **`style.css`** — All the colours, fonts, spacing and animations. Edit this if you want to change how it looks.
- **`tm.js`** — The brain of the project. Contains the transition table and step logic. **This is the file to edit if you want to support a different Turing Machine language.**
- **`visualizer.js`** — Connects the TM logic to the UI. Handles rendering the tape, moving the head, speed control and button actions.
- **`README.md`** — This file. Explains the project to anyone visiting the repo.

---

## 📚 How the TM Works

For every `a` found on the tape, the machine marks off exactly **3 b's** using marker symbols:
- `X` = a consumed `a`
- `Y` = a consumed `b`

**State flow:**
```
Q0 → Q1 → Q2 → Q3 → Q5 (rewind) → repeat
                              ↓
                         Q4 → Q6 → ha (accept)
```

---

## 📄 License

MIT License — free to use, modify, and share.

---

## 🙋‍♂️ Author

**Thilaksan**
- GitHub: [@Thilaksan8](https://github.com/Thilaksan8)

> *Built with curiosity and a lot of tape symbols* 🎓