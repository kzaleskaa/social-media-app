import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <p className={classes.copyright}>
        Copyright &copy; 2022 <a href="https://github.com/kzaleskaa">kzaleskaa</a>. All Rights
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
