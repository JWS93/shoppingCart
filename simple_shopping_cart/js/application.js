var updateSubTotal = function (ele) {
  var productPrice = parseFloat($(ele).children('.cost').text());
  var productQuantity = parseFloat($(ele).find('.quantity input').val());
  var productSubTotal = productPrice * productQuantity;
  $(ele).children('.productTotal').html('$' + productSubTotal);

  return productSubTotal
}

var sum = function (acc, x) { return acc + x; };

var grandTotal = function() {
  var productTotals = [];
  $('tbody tr').each(function(i, ele) {
    productTotals.push(updateSubTotal(ele));
  })
  var cartTotal = productTotals.reduce(sum);
  $('#grandTotal').html(cartTotal);
}

$(document).ready(function() {
  $('tbody tr').each(function() {
    updateSubTotal(this);
  });

  $('.btn.remove').on('click', function (event) {
    $(this).closest('tr').remove();
    grandTotal();
  });

  $(document).on('input', 'tr input', function () {
    updateSubTotal(this.closest('tr'));
    grandTotal();
  });
})