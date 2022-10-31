export default class ColorsForCharts {

  static  getColors(count)
  {
    const colors = ["#F7464A","#46BFBD", "#FDB45C", "#949FB1", "#4D5360",
                    "#472B83", "#45036F", "#912470", "#FF6B40", "#FFB873",
                   "#FFD373", "#F9FE72", "#B8BE2F", "#71AD2B", "#218457"];

    return colors.slice(0, count);
  }

}
