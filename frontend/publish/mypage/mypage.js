window.addEventListener("DOMContentLoaded", function(){

    const InfoBody = document.querySelector(".myInfoBody");
    const InfoButton = document.querySelector(".ButtonFull3");
    let InfoBodyHeight, isOn;
    
    InfoButton?.addEventListener("click", function(){
        if(window.innerWidth <= 820){
            isOn ? 
            (InfoBody.style.height = InfoBodyHeight + "px", 
            InfoButton.innerText = "저장") :
            (InfoBody.style.height = 0,
            InfoButton.innerText = "프로필 관리하기");
            isOn = !isOn;
        }
    });
    function mobileView(){
        if(InfoBody && InfoButton){
            InfoBody.style.height = 'auto';
            InfoBodyHeight = InfoBody.clientHeight;
            isOn = true;
            window.innerWidth <= 820 ?
            (InfoButton.innerText = "프로필 관리하기",
            InfoBody.style.height = 0) :
            (InfoButton.innerText = "저장",
            InfoBody.style.height = InfoBodyHeight);
        }
    }
    mobileView();
    window.addEventListener("resize", mobileView);


    const Profile = document.querySelectorAll(".ProfileBox>img");
    const Name = document.querySelectorAll(".PostCardHead>.TextBox>.Name");
    Profile?.forEach((el)=> { //프로필 클릭시 툴팁노출
        el.addEventListener("click", function() {
            const ToolTip = this.closest(".PostCardHead").lastElementChild;
            ToolTip.style.display = 'block';
            ToolTip.style.top = 0;
            if(window.innerWidth >= 820) {
                ToolTip.style.left = '72px';
            } else {
                ToolTip.style.left = '40px';
            }
        });
    });
    Name?.forEach((el)=> { //닉네임 클릭시 툴팁 노출
        el.addEventListener("click", function() {
            const ToolTip = this.closest(".PostCardHead").lastElementChild;
            ToolTip.style.display = 'block';
            ToolTip.style.top = '64px';
            ToolTip.style.left = '72px';
        });
    });

    const ToolTipNode = document.querySelectorAll(".ProfileToolTip");
    document.addEventListener("click", function(e) { //툴팁 가리기
        if(ToolTipNode.length) { //ToolTip이 존재할떄
            if(e.target.classList[0] != 'Name' && e.target.classList[0] != 'ProfileIMG'){ //프로필이미지나 닉네임 이외 클릭했을 때
                ToolTipNode.forEach((el) => el.style.display = 'none');
            } else {
                const idxNode = e.target.closest('li');
                const idxTarget = [...e.target.closest(".PostWrapper ul").children]; //프로필이미지나 닉네임 클릭했을 때
                const idx = idxTarget.indexOf(idxNode);
                ToolTipNode.forEach((el, index) => {
                    console.log(idxTarget, idxNode, idx)
                    if(idx != index) el.style.display = 'none';
                });
            }
        } 
    });
    
    let swiperProperty = num => ({ //스와이퍼 속성
        slidesPerView: 3,
        navigation: {
            nextEl: '.ButtonNext' + num, 
            prevEl: '.ButtonPrev' + num
        },
        spaceBetween: 10,
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        breakpoints: {
            768: {
                spaceBetween: 16
            }
        }
    });

    if(document.querySelector(".CardSwiper")){
        const swiper1 = new Swiper('.swiper1', swiperProperty(1));
        const swiper2 = new Swiper('.swiper2', swiperProperty(2));
        const swiper3 = new Swiper('.swiper3', swiperProperty(3));
        const swiper4 = new Swiper('.swiper4', swiperProperty(4));
        const swiper5 = new Swiper('.swiper5', swiperProperty(5));
    }

    const SwiperBtn = document.querySelectorAll(".SwiperBtn");
    SwiperBtn?.forEach(e => { //스와이퍼카드 드롭다운
        e.addEventListener('click', function(){
            let ThisSwiperCard = this.closest(".SwiperCardWrapper").children[0];
            ThisSwiperCard.classList.toggle('On');
            if(ThisSwiperCard.classList.contains('On')){
                ThisSwiperCard.children[1].style.height = `${SwiperCardHeight}px`;
            } else {
                ThisSwiperCard.children[1].style.height = 0;
            }
        });
    });

    const SwiperCard = document.querySelector(".SwiperCardBottom");
    let SwiperCardHeight;
    function SwiperHeightFunc(){ //스와이퍼카드 원래 높이 구하기
        if(SwiperCard){
            SwiperCard.style.height = 'auto';
            SwiperCardHeight = SwiperCard.clientHeight;
            SwiperCard.style.height = 0;
        }
    }
    SwiperHeightFunc();
    window.addEventListener('resize', SwiperHeightFunc);
});