let swiperMixin = {
  data() {
    return {
      swiperOption: {
        spaceBetween: 20,
        slidesPerView: 2.2,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
};
export default swiperMixin;
