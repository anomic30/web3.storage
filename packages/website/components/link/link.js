import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const WrappedLink = ({ tabIndex = 0, href, ...otherProps }) => {
  // TODO - Make sure error no longer happening in console
  // Only pass prefetch prop when false https://nextjs.org/docs/messages/prefetch-true-deprecated
  // This object was created to avoid passing the prefetch prop to the dom below
  // const linkProps = {
  //   ...(!prefetch ? { prefetch: false } : {}),
  // };

  // If child component is already a link:
  if (otherProps.children.type === 'a') {
    return (
      // Clone children to pass onClick prop. Passing onClick to Next Link does not work with current version of Next
      <Link href={href} {...otherProps}>
        {otherProps.onClick
          ? React.cloneElement(otherProps.children, { onClick: otherProps.onClick })
          : otherProps.children}
      </Link>
    );
  }

  // Otherwise, inject a link element to wrap children with default styles
  // const styles = { textDecoration: 'none', color: 'inherit', ...style };
  return (
    <Link href={href} {...otherProps}>
      <a href="replace" {...otherProps} tabIndex={tabIndex} onClick={otherProps.onClick}>
        {otherProps.children}
      </a>
    </Link>
  );
};

WrappedLink.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  href: PropTypes.string.isRequired,
};

export default WrappedLink;
