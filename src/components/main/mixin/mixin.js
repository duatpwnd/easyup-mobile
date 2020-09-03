let swiperMixin = {
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
};
export default swiperMixin;
