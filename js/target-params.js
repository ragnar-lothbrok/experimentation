// Adobe Target: page-level parameters. at.js calls targetPageParams() on every
// delivery request and merges the returned values in. Used here to send the
// Target property token so activities are scoped to this property.
// Must be defined before at.js loads.
function targetPageParams() {
  return {
    "at_property": "3810f24e-505c-36e1-c310-831c178162b0"
  };
}
