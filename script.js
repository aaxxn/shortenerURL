// Fungsi untuk memendekkan URL menggunakan API TinyURL
async function shortenURL(longURL) {
  const apiURL = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longURL)}`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const shortURL = await response.text();
    return shortURL;
  } catch (error) {
    console.error("Ada masalah dengan pemendekkan URL:", error);
    return null;
  }
}

// Fungsi untuk memendekkan URL dan memperbarui tampilan
function pendekkan() {
  const urlInputElement = document.getElementById("urlInput");
  const longURL = urlInputElement.value;

  // Hapus tombol salin jika sudah ada sebelumnya
  const existingCopyButton = document.getElementById("copyBtn");
  if (existingCopyButton) {
    existingCopyButton.remove();
  }

  if (longURL) {
    shortenURL(longURL)
      .then(shortURL => {
        if (shortURL) {
          // Ganti value input menjadi URL pendek
          urlInputElement.value = shortURL;

          // Set input menjadi readonly
          urlInputElement.setAttribute("readonly", true);
          
          // Tampilkan tombol untuk menyalin URL pendek
          const copyButton = document.createElement("button");
          copyButton.id = "copyBtn";
          copyButton.innerText = "Salin";
          copyButton.style.marginLeft = "10px";

          // Tambahkan event listener untuk tombol salin
          copyButton.addEventListener("click", () => {
            salinKeClipboard(shortURL);
          });

          // Menambahkan tombol "Salin" sebelum elemen pesan
          const pesanElement = document.getElementById("pesan");
          pesanElement.parentNode.insertBefore(copyButton, pesanElement);

          // Menampilkan pesan setelah tombol salin ditambahkan
          pesanElement.style.display = "block";
          
        } else {
          alert("Gagal memendekkan URL.");
        }
      });
  } else {
    alert("Masukkan URL terlebih dahulu.");
  }
}

// Fungsi untuk menyalin URL ke clipboard
function salinKeClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("URL berhasil disalin ke clipboard!");
}

// Menambahkan event listener untuk tombol "Shortener"
document.getElementById("shortenBtn").addEventListener("click", pendekkan);
