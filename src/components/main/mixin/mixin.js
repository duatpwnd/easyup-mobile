let swiperMixin = {
  data() {
    return {
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 2.1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
};
export default swiperMixin;
