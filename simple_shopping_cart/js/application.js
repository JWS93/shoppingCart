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

  $('#addProduct').on('submit', function(event) {
    event.preventDefault();
    var name = $(this).children('[name = name]').val();
    var cost = $(this).children('[name = cost]').val();
    var quantity = $(this).children('[name = quantity]').val();
    console.log(name, cost, quantity);

    $('tbody').append('<tr>' + 
    '<td class = "name">' + name + '</td>' +
    '<td class = "cost">' + cost + '</td>' +
    '<td class = "quantity"><input type = "number" value = "' + quantity + '" /></td>' +
    '<td class = "productTotal"></td>' +
    '<td><button class = "btn btn-light btn-sm remove">remove</button></td>' +
    '</tr>');

    var newRow = $('tbody tr:last');
    updateSubTotal(newRow);
    grandTotal();
    $(this).children('[name = name]').val('');
    $(this).children('[name = cost]').val('');
    $(this).children('[name = quantity]').val('');
  })
  
})