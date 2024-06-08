var updateSubTotal = function (ele) {
  var productPrice = parseFloat($(ele).children('.cost').text());
  var productQuantity = parseFloat($(ele).find('.quantity input').val());
  var productSubTotal = productPrice * productQuantity;
  $(ele).children('.productTotal').html('$' + productSubTotal);
}




$(document).ready(function() {
  $('tbody tr').each(function() {
    updateSubTotal(this);
  });

  $('.btn.remove').on('click', function (event) {
    $(this).closest('tr').remove();
    updateSubTotal();
  });

  $(document).on('input', 'tr input', function () {
    updateSubTotal(this.closest('tr'));
  });
})