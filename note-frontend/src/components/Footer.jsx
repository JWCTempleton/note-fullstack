const Footer = () => {
  const footerStyle = {
    color: "white",
    backgroundColor: "salmon",
    fontStyle: "italic",
    fontSize: 16,
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    padding: "20px 30px",
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, JWCT Designs 2023</em>
    </div>
  );
};

export default Footer;
