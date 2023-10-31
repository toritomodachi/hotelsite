
var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
    openContentImage, closeContent, windowWidth, windowHeight, currentCard;

init();

function init() {
  resize();
  selectElements();
  attachListeners();
}

function selectElements() {
  cards = document.getElementsByClassName('card'),
  nCards = cards.length,
  cover = document.getElementById('cover'),
  openContent = document.getElementById('open-content'),
  openContentText = document.getElementById('open-content-text'),
  openContentImage = document.getElementById('open-content-image')
  closeContent = document.getElementById('close-content');
}

function attachListeners() {
  for (var i = 0; i < nCards; i++) {
    attachListenerToCard(i);
  }
  closeContent.addEventListener('click', onCloseClick);
  window.addEventListener('resize', resize);
}

function attachListenerToCard(i) {
  cards[i].addEventListener('click', function(e) {
    var card = getCardElement(e.target);
    onCardClick(card, i);
  })
}

function onCardClick(card, i) {
  currentCard = card;
  currentCard.className += ' clicked';
  setTimeout(function() {animateCoverUp(currentCard, i)}, 500);
  animateOtherCards(currentCard, true);
  openContent.className += ' open';
}

function animateCoverUp(card, i) {
  var cardPosition = card.getBoundingClientRect();
  var cardStyle = getComputedStyle(card);
  setCoverPosition(cardPosition);
  setCoverColor(cardStyle);
  scaleCoverToFillWindow(cardPosition);
  openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+paragraphText[i];
  openContentImage.src = card.children[1].src;
  setTimeout(function() {
    window.scroll(0, 0);
    pageIsOpen = true;
  }, 300);
}

function animateCoverBack(card) {
  var cardPosition = card.getBoundingClientRect();
  setCoverPosition(cardPosition);
  scaleCoverToFillWindow(cardPosition);
  cover.style.transform = 'scaleX('+1+') scaleY('+1+') translate3d('+(0)+'px, '+(0)+'px, 0px)';
  setTimeout(function() {
    openContentText.innerHTML = '';
    openContentImage.src = '';
    cover.style.width = '0px';
    cover.style.height = '0px';
    pageIsOpen = false;
    currentCard.className = currentCard.className.replace(' clicked', '');
  }, 301);
}

function setCoverPosition(cardPosition) {
  cover.style.left = cardPosition.left + 'px';
  cover.style.top = cardPosition.top + 'px';
  cover.style.width = cardPosition.width + 'px';
  cover.style.height = cardPosition.height + 'px';
}

function setCoverColor(cardStyle) {
  cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
  var scaleX = windowWidth / cardPosition.width;
  var scaleY = windowHeight / cardPosition.height;
  var offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
  var offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
  cover.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+') translate3d('+(offsetX)+'px, '+(offsetY)+'px, 0px)';
}

function onCloseClick() {
  openContent.className = openContent.className.replace(' open', '');
  animateCoverBack(currentCard);
  animateOtherCards(currentCard, false);
}

function animateOtherCards(card, out) {
  var delay = 100;
  for (var i = 0; i < nCards; i++) {
    if (cards[i] === card) continue;
    if (out) animateOutCard(cards[i], delay);
    else animateInCard(cards[i], delay);
    delay += 100;
  }
}

function animateOutCard(card, delay) {
  setTimeout(function() {
    card.className += ' out';
   }, delay);
}

function animateInCard(card, delay) {
  setTimeout(function() {
    card.className = card.className.replace(' out', '');
  }, delay);
}

function getCardElement(el) {
  if (el.className.indexOf('card ') > -1) return el;
  else return getCardElement(el.parentElement);
}

function resize() {
  if (pageIsOpen) {
    var cardPosition = currentCard.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
  }
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

var paragraphText = ['<hr class="hr"><p><p class="gang" id="ser">AM 11:00까지 체크아웃</p><br> ※ 이후 시간에는 시간당<br>10,000원씩 추가비용 발생합니다.<br>※ 상황에 따라 오후 3시까지 가능합니다.<br>객실 들어가실 때<br>도어센서 한번 터치하시고<br> 고객님 비밀번호 눌러주시면 됩니다<br><p class="red"><b>(ex) 4567* / 5314*</b></p><br><span style="text-decoration: underline;"><b>객실 내에 타월은 무료 추가가 불가합니다.</b></span><br>분실 및 추가시 요금이 발생합니다<br>(배쓰 타월 10,000원, 페이스 타월 5,000원)<br><br><span style="text-decoration: underline;"><b>생수 추가 시 한 병당 1,000원 입니다.</b></span><br><br><span style="text-decoration: underline;"><b>충전기는 보증금(1만원) 납입 후 대여 가능</b></span><br> - 카드 불가<br><br>호텔 내 전 객실 금연입니다. <br>(흡연 시 1박 요금 부과)<br><br>객실로 배달은 불가하지만<br>1층에서는 픽업가능합니다.<br><br>2박 이상 이용 시<br>- DND 버튼을 누르면 객실청소 불가<br>MR 버튼을 누르면 객실 청소 가능<br>(정비요청은 오후 3시까지 가능합니다)<br><br><span style="text-decoration: underline;"><b>프런트 데스크 번호 : 3100</b></span><br><span style="text-decoration: underline;"><b>무료 WI-FI : "HABIO HOTEL"</b></span></p>',
'<hr class="hr"><p><b>운영 시간 : 07 : 00 ~ 10 : 00</b><br><p class="red">※ 09 : 30 분까지 입장바랍니다.</p><br>객실티켓 지참하시기 바랍니다.<br>룸 서비스는 제공되지 않습니다.</p>',
' <hr class="hr"><p class="red">체크아웃 당일 이후 10시까지 무료</p>- 횟수 제한 없이 입/출자 가능<br>출자 전 차량등록 확인 필수 !!<br><b style="text-decoration: underline;">사전 미등록시 비용은 투숙객 부담입니다.</b></p>',
'<p>6시간 무료 사용<br>(이후 시간당 2천원 요금발생 - 카드 불가)</p>','<p>파크하비오에는 호텔말고도 더 즐길 수 있는 다양한 서비스들이 있습니다. 함께 즐기러 가보겠습니까?</p><br><a href="./index-two.html">다른시설 & 혜택 구경하러가기</a>'];
