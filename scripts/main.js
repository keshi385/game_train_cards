'use strict';

/**
 * ロード時の処理
 */
document.addEventListener('DOMContentLoaded', () => {});

{
  let turnCardId;       // タイマ変数
  let returnCardId;     // タイマ変数
  let countOfHit = 0;   // HIT数
  let countOfMiss = 0;  // MISS数

  // NodeListの作成
  const cards = document.querySelectorAll('.card');
  // messageクラスの取得
  const message = document.querySelector('.message');
  // リトライボタン
  const replay = document.querySelector('.replay');
  // クリックイベントの作成
  cards.forEach((card, index) => {
    // カード配布
    card.classList.add(Images[index].c)
    // イベント発行
    card.addEventListener('click', index => {
      if (!card.classList.contains('finish')) {
        message.textContent = '';
        turnCard(card, 0);
        disablePointerEvent();
      }
    });
  });

  /**
   * クリックイベントを無効にする
   */
  const disablePointerEvent = () => {
    cards.forEach((card) => {
      card.style.pointerEvents = "none";
    });
  }

  /**
   * クリックイベントを有効にする
   */
   const enablePointerEvent = () => {
    cards.forEach((card) => {
      card.style.pointerEvents = "auto";
    });
  }
  
  /**
   * カードの反転（めくる）
   * @param card 
   * @param deg 
   */
  const turnCard = (card, deg) => {
    // 反転するまでチェック
    if (deg < DEG_HALF) {
      // 画像の切り替え
      if (deg === DEG_QUART) {
        card.style.backgroundImage = retImage(card);
      } else {
        card.style.transform = 'rotateY(' + deg + 'deg)';
      }
      // タイマ再起動
      turnCardId = setTimeout(() => {
        turnCard(card, deg+= DEG_UNIT);
      }, TIME_20_MSEC)
    } else {
      // タイマの停止
      clearTimeout(turnCardId);
      // めくった後の判定
      judgeCard(card);
      // クリックイベント有効化
      enablePointerEvent();
    }
  }

  /**
   * 選択したカードの画像パスを返す
   * @param card 
   * @return path
   */
  const retImage = card => {
    let path;

    // 画像のパスを取得
    path = Images[retIndex(card)].path;

    // 取得した画像パスを返却
    return path;
  };

  /**
   * 一致するImagesのインデックス取得
   * @param card
   * @return index
   */
  const retIndex = card => {
    let index;

    for (let i = 0; i < Images.length; i++) {
      if (card.classList.contains(Images[i].c)) {
        index = i;
        break;
      }
    }

    return index;
  };

  /**
   * めくったカードの正誤判定
   * @param target
   */
  const judgeCard = target => {
    let reversed = false;

    cards.forEach(card => {
      // reverseクラスが付加されている要素を検索
      if (card.classList.contains('reverse')) {
        reversed = true;
        if (Images[retIndex(card)].c === Images[retIndex(target)].c) {
          // 一致すれば正解
          console.log('一致!!');
          // 完了クラスの付与
          card.classList.add('finish');
          target.classList.add('finish');
            // 全てのカードを一致させれば、ゲームクリア
            if (++countOfHit >= (Images.length / 2)) {
            // メッセージ表示
            message.style.fontSize = "60px";
            message.textContent = `COMPLETED!`;
            replay.style.display = "block";
            message.textContent = message.textContent + `  ${countOfHit} HIT! ${countOfMiss} MISS!`;
          } else {
            // メッセージ表示
            message.textContent = `${countOfHit} HIT! ${countOfMiss} MISS!`;
          }
        } else {
          // 一致しなければ不正解（カードを戻す）
          console.log('不一致!!');
          // メッセージ表示
          message.textContent = `${countOfHit} HIT! ${++countOfMiss} MISS!`;
          returnCard(card, 0);
          returnCard(target, 0);
        }
        // reverse(裏返し済)のクラス削除
        card.classList.remove('reverse');
        target.classList.remove('reverse');
      }
    });
    if (reversed !== true) {
      // reverse(裏返し済)のクラス追加
      target.classList.add('reverse');
    }
  }

  /**
   * カードの反転（戻す）
   * @param card 
   * @param deg 
   */
   const returnCard = (card, deg) => {
    // 反転するまでチェック
    if (deg < DEG_HALF) {
      // 画像の切り替え
      if (deg === DEG_QUART) {
        card.style.backgroundImage = "url(./img/rail.png)";
      } else {
        card.style.transform = 'rotateY(' + deg + 'deg)';
      }
      // タイマ再起動
      returnCardId = setTimeout(() => {
        returnCard(card, deg+= DEG_UNIT);
      }, TIME_20_MSEC)
    } else {
      // タイマの停止
      clearTimeout(returnCardId);
    }
  }

  /**
   * ゲームの再開
   */
   replay.addEventListener('click', () => {
    window.location.reload();
    replay.style.display = "none";
  });

}