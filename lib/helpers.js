Hypnos = {};

function escapeRegex(text) {
  return text.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}

Hypnos.convertToQuery = function(options) {
  options = options || {};

  var serial = options.serial;
  var filters = _.omit(options, 'page', 'serial');

  if (serial) {
    var pattern = '^' + escapeRegex(serial);
    filters = _.extend(filters, {
      $or : [
        { sid: { $regex: pattern, $options: 'i' } },
        { oid: { $regex: pattern, $options: 'i' } }
      ]
    });
  }
  return filters;
}