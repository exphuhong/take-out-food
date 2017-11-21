function bestCharge(selectedItems) {
  let list = '============= 订餐明细 =============' + '\n';
  let firstPrice = 0;
  let secondPrice = 0;
  let items = loadAllItems();
  let promotions = loadPromotions();
  let totalPrice = 0;
  let halfPriceFood = [];
  let flag = false;
  selectedItems.forEach((selectedItem) => {
    let num = 1;
    items.forEach((item) => {

      if (selectedItem.indexOf('x') !== -1) {
        let splitItem = selectedItem.split('x');
        selectedItem = splitItem[0].trim();
        num = splitItem[1].trim();
      }

      //根据商标获取所购买的产品
      if (item.id !== selectedItem) {
      } else {
        list += item.name + ' ' + 'x' + ' ' + parseInt(num) + ' ' + '=' + ' ' + item.price * parseInt(num) + '元' + '\n';

        let promotionBarcode = promotions[1].items;
        for (let i = 0; i < 2; i++) {
          if (selectedItem === promotionBarcode[i]) {
            flag = true;
            halfPriceFood.push(item.name);
            secondPrice += parseInt(num) * (item.price / 2);
            break;
          } else if (i === 1) {
            secondPrice += parseInt(num) * item.price;
          }
        }
        totalPrice += parseInt(num) * item.price;
      }

    });
  });
  if (totalPrice >= 30) {
    flag = true;
    firstPrice = totalPrice - 6;
  } else {
    firstPrice = totalPrice;
  }
  let usePromotion = '';
  let savePrice = 0;
  if (firstPrice <= secondPrice) {
    usePromotion = '满30减6元';
    savePrice = totalPrice - firstPrice;
    totalPrice = firstPrice;
  } else {
    usePromotion = '指定菜品半价(';
    for (let i = 0;i<halfPriceFood.length;i++) {
      usePromotion += i!==halfPriceFood.length-1?halfPriceFood[i]+'，':halfPriceFood[i];
    }
    usePromotion += ')';
    savePrice = totalPrice - secondPrice;
    totalPrice = secondPrice;
  }

  if (flag) {
    list += '-----------------------------------' + '\n' +
      '使用优惠:' + '\n' + usePromotion + '，' + '省' + savePrice + '元' + '\n'
      + '-----------------------------------' + '\n';
  }else {
    list += '-----------------------------------' + '\n';
  }
  list += '总计：' + totalPrice + '元' + '\n' + '===================================';

  return list;
}

