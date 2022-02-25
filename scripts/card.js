const Images = shuffle([
  {c: "hankyu", path: "url(./img/hankyu.png)"},
  {c: "hinotori", path: "url(./img/hinotori.png)"},
  {c: "kagayaki", path: "url(./img/kagayaki.png)"},
  {c: "nozomi", path: "url(./img/nozomi.png)"},
  {c: "mizukaze", path: "url(./img/mizukaze.png)"},
  {c: "yamanotesen", path: "url(./img/yamanotesen.png)"},
  {c: "hankyu", path: "url(./img/hankyu.png)"},
  {c: "hinotori", path: "url(./img/hinotori.png)"},
  {c: "kagayaki", path: "url(./img/kagayaki.png)"},
  {c: "nozomi", path: "url(./img/nozomi.png)"},
  {c: "mizukaze", path: "url(./img/mizukaze.png)"},
  {c: "yamanotesen", path: "url(./img/yamanotesen.png)"},
]);
// シャッフル関数
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }

  return arr;
}