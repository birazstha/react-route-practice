import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import Newsletter from "./Newsletter/NewsletterForm";

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 40px;
  gap: 2rem;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: white;
  padding: 10px 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 5px;

  &.active {
    background-color: #0056b3;
    color: white;
    border-radius: 5px;
    padding: 10px 15px;
  }

  &:hover {
    background-color: #0056b3; /* Same background color as active on hover */
  }
`;

export default function MainNavigation() {
  return (
    <NavBar>
      <div>
        <Link to="">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/newsletter">Newsletter</Link>
      </div>
      <div>
        <Newsletter />
      </div>
    </NavBar>
  );
}
