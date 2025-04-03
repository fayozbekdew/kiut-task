import React from "react";
import { Link, useLocation } from "react-router-dom";
import { StarIcon } from "../assets";

function BreadCrumb() {
  const { pathname } = useLocation();
  const routes = [];
  pathname
    .split("/")
    .slice(1)
    .forEach((route) => {
      routes.push(route);
      routes.push("/");
    });
  routes.pop();
  function routeChecker(href) {
    return routes.slice(0, routes.indexOf(href) + 1).join("");
  }
  return (
    <div className="pb-4 flex items-center gap-x-1">
      <img src={StarIcon} alt="star" className="w-5 h-5" />
      {routes.map((route, idx) =>
        route.length > 1 ? (
          <Link key={idx} className="text-md" to={`/${routeChecker(route)}`}>
            {route}
          </Link>
        ) : (
          <p key={idx}>{route}</p>
        )
      )}
    </div>
  );
}

export default BreadCrumb;
