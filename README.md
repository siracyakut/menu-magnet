<p align="center">
<img style="width:120px;height:120px;" src="https://raw.githubusercontent.com/siracyakut/menu-magnet/main/public/images/logo.png" alt="App Icon"/>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="license badge"/>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="js badge"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React badge"/>
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux badge"/>
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite badge"/>
  <img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" alt="git badge"/>
</p>
<h1 align="center">
Menu Magnet
</h1>

### Proje Amacı ve Hedefi
Menu Magnet projesinin amacı, işletmeler için reklamsız, kolay kullanılabilir ve yönetilebilir ücretsiz bir dijital/QR menü sistemi sunmaktır. Kayıt olan her işletmeye özel bir sayfa ve QR kod oluşturulur. İşletmeler dilediği gibi kategori ve menü oluşturma/düzenleme/silme işlemi gerçekleştirebilir.

### Proje Kısımları
+ Kayıt & Giriş Akışı
    + E-mail & Şifre Kombinasyonu

      Kullanıcı sisteme kayıt olurken bir e-posta ve şifre belirler. Bu e-posta kullanıcının kimliği olarak belirlenecektir. Daha önceden sisteme kayıtlı olmaması gerekir. Kayıt esnasında kullanıcı tarafından atılacak herhangi bir yanlış adım sistem tarafından uyarılacaktır.

    + Google One-Tap Login

      Kullanıcı sisteme kayıt olmak için kayıt formunun altında bulunan ‘Google hesabını kullanarak giriş yap’ butonuyla etkileşime geçer. Daha sonra kullanıcı google’a yönlendirilir ve google hesabına giriş yapar. Gerekli adımları tamamladığında uygulamaya yönlendirilir, kayıt işlemi tamamlanmış olur ve sistem otomatik olarak kullanıcının hesabına giriş yapar.

Kayıt/giriş işlemi tamamlandığında kullanıcının bilgileri server-side’da veritabanına kayıt edilir ve server’dan bir JWT token döner. Kullanıcının bilgileri ve güvenliği bu token sayesinde sağlanır. Token kullanıcının browser’ında cookielerde tutulur ve bu cookie server tarafından ‘secure’ ve‘httpOnly’ kavramları kullanılarak set edilir. Bu sayede sistem CSRF/XSRF/XSS gibi bir çok güvenlikaçığının önüne geçmiş olur.

+ İşletme Oluşturma

Kullanıcıların ilk girişlerinde bir işletme oluşturmaları gerekir. İstenilen bilgiler işletme adı ve bir renk seçimidir. İşletme rengi daha sonra seçilecek kategori ikonlarında, işletme sayfasında vs. kullanılacaktır.

+ Kullanıcı Paneli – Ana Sayfa

Kullanıcı gerekli bilgileri verdikten sonra karşısına işletme bilgileri kısmı gelir. Bu sayfada kullanıcı kayıt sırasında kullandığı e-posta adresini ve işletme ismini görür. Bu kısmın hemen altında işletmenin QR kod kısmı bulunur. Bu QR kod kullanıcının işletme sayfasına aittir. Dilediği her yerde kullanabilir. QR kod kısmının altında ise işletme bilgilerinin değiştirilebilmesi için gerekli panel bulunur. Kullanıcı işletmesinin isim ve renk bilgilerini dilediği zaman değiştirebilir.

+ Kullanıcı Paneli – Kategori Yönetimi

Bu kısım kullanıcının işletmesi için kategorilerini yönetebileceği bölümdür. Bu sayfada mevcut kategorileri listeleme, düzenleme ve silme seçenekleri bulunur. Ayriyeten yeni kategori oluşturma kısmı da bu sayfada bulunmaktadır. Kategori isimlerinin yanında bulunan kalem ve çarpı işaretleriyle kategoriyle ilgili düzenleme ve silme işlemleri yapılabilir. Kategorilerin listelendiği kısımın altında yeni kategori oluşturma paneli bulunmaktadır. Yeni bir kategori oluşturmak için istenen bilgiler kategori adı, açıklaması ve ikonudur.

+ Kullanıcı Paneli – Menü Yönetimi

Bu kısımda ilk olarak oluşturduğumuz menüleri listeleme ve düzenleme kısmı mevcuttur. Kategori kısmındaki gibi aynı şekilde butonlarla etkileşime geçilerek düzenleme ve silme işlemleri yapılabilir. Menü oluştururken ise menü adı, açıklaması, kategorisi ve fiyat bilgisini girmeliyiz. Kategori kısmındaki seçenekler kendi eklediğimiz kategorilerdir.

+ İşletme Sayfası

Oluşturulan QR kod telefondan taratıldığında veya bilgisayardayken üzerine tıklandığında işletme sayfasına yönlendiriliriz. Bu sayfada işletme sahibi olan kullanıcının eklediği kategoriler ve menüler gözükmektedir. Ayrıca seçilen ikonlar ve işletme rengi bu sayfada yansıtılmaktadır. Kullanıcı beğendiği menülerin yanındaki kalp ikonuna basarak menüyü favorilerine alabilir. Daha sonra görüntülemek için sağ alttan bulunan kalp ikonuna basarak favori menülerini görüntüleyebilir.

+ Responsive Tasarım

Uygulama tüm cihazlarda ve tüm çözünürlüklerde sorunsuz ve stabil çalışacak şekilde tasarlanmıştır.

### Projede Kullanılan Bazı Önemi Teknolojiler

| BACK-END  | FRONT-END  |
| :------------: | :------------: |
| NodeJS  | React  |
| ExpressJS  | Redux  |
| MongoDB  | TailwindCSS  |
| Mongoose  | React Query  |
| JWT  | Vite  |

### Lisans

Bu proje MIT Lisansı kapsamında kullanıma açıktır.
