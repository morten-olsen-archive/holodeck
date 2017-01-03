exports.createElement = (type, props, ...children) => {
  if (children) {
    children = children.map(c => typeof c === 'function' ? c() : c);
  }
  const output = {
    type,
    className: props && props.className ? props.className : '',
    props: Object.assign({}, props, {
      content: children.filter(c => typeof c === 'string')[0],
    }),
    children: children.filter(c => typeof c !== 'string' && !!c),
  }
  return output;
}
