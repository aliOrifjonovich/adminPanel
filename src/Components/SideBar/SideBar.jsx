import styles from "./SideBar.module.scss";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { ChevronIcon, UserIcon } from "helpers/Icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { sideBarExpand } from "redux/sidebar/sidebar.slice";
import { useNavigate, useParams } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Button, Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import {
  SettingsApplicationsRounded,
  AppRegistration,
  ViewCarousel,
  Category,
  ProductionQuantityLimits,
  PhotoSizeSelectSmall,
  School,
  Logout,
  AddPhotoAlternate,
  Apps,
  VisibilityOff,
  RemoveRedEye,
  Grading,
} from "@mui/icons-material";
import { Container, Draggable } from "react-smooth-dnd";
import WCheckbox from "Components/Form/WCheckbox/WCheckbox";
import { useForm } from "react-hook-form";

const menuData = [
  {
    name: "Users",
    icon: <UserIcon sx={{ color: "#fff" }} />,
    eventKey: "user",
  },
  {
    name: "Application",
    icon: <AppRegistration sx={{ color: "#fff" }} />,
    eventKey: "application",
  },
  {
    name: "Banner",
    icon: <ViewCarousel sx={{ color: "#fff" }} />,
    eventKey: "banner",
  },
  {
    name: "Category",
    icon: <Category sx={{ color: "#fff" }} />,
    eventKey: "category",
  },
  {
    name: "Product",
    icon: <ProductionQuantityLimits sx={{ color: "#fff" }} />,
    eventKey: "product",
  },
  {
    name: "Sizes",
    icon: <PhotoSizeSelectSmall sx={{ color: "#fff" }} />,
    eventKey: "size",
  },
  {
    name: "University",
    icon: <School sx={{ color: "#fff" }} />,
    eventKey: "university",
  },
  {
    name: "Images",
    icon: <AddPhotoAlternate sx={{ color: "#fff" }} />,
    eventKey: "product_image",
  },
  {
    name: "Order",
    icon: <Grading sx={{ color: "#fff" }} />,
    eventKey: "order",
  },
];

export function SideBar({ page, header, setSwitchResult, switchResult }) {
  const dispatch = useDispatch();
  const expanded = useSelector((state) => state.sidebar.expand);
  const navigate = useNavigate();
  const { tab_name } = useParams();

  const { control } = useForm({
    defaultValues: {},
  });

  const onColumnsPositionChange = (dragResult) => {
    // const result = applyDrag(values.columnsList, dragResult);
    // if (result) {
    //   setValue("columnsList", result);
    //   mutateStaticRelation(result);
    // }
  };

  const mutateAppSetting = () => {};

  return (
    <SideNav expanded={expanded} className={styles.sidenav}>
      <div>
        <div className={styles.expand}>
          <h1
            onClick={() => navigate(`/${page}`)}
            className={styles.expand__logo}
          >
            {expanded ? (
              <div className={styles.expand__writer}>
                <span>{header.slice(0, 1)}</span>
                <Typewriter
                  options={{
                    strings: [header.slice(1)],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
            ) : (
              header.slice(0, 1)
            )}
          </h1>
          <div
            onClick={() => dispatch(sideBarExpand.setSideBarExpand())}
            className={styles.expand__icon}
          >
            <ChevronIcon />
          </div>
        </div>
        <SideNav.Nav selected={tab_name} className={styles.navbar}>
          <Container lockAxis="y" onDrop={onColumnsPositionChange}>
            {menuData.map((elem, index) => (
              <Draggable className={styles.dnd}>
                <NavItem
                  eventKey={elem.eventKey}
                  onClick={(e) => navigate(`/${page}/${elem.eventKey}`)}
                  className={styles.navbar__item}
                  style={{
                    backgroundColor:
                      tab_name === elem.eventKey ? "rgba(0, 0, 0, 0.2)" : "",
                  }}
                >
                  <NavIcon
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {expanded ? (
                      <Button sx={{ width: "100%", height: "100%" }}>
                        {elem.icon}
                      </Button>
                    ) : (
                      <Tooltip
                        title={elem.name}
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                      >
                        <Button sx={{ width: "100%", height: "100%" }}>
                          {elem.icon}
                        </Button>
                      </Tooltip>
                    )}
                  </NavIcon>

                  <NavText style={{ width: "100%" }}>
                    <div className={styles.draggableRow}>
                      <p className={styles.label}>{elem.name}</p>
                      {page === "setting" && (
                        <WCheckbox
                          mutateStaticRelation={mutateAppSetting}
                          control={control}
                          name={`columnsList[${index}].is_checked`}
                          icon={<VisibilityOff />}
                          checkedIcon={<RemoveRedEye sx={{ color: "#fff" }} />}
                        />
                      )}
                    </div>
                  </NavText>
                </NavItem>
              </Draggable>
            ))}
          </Container>
        </SideNav.Nav>
      </div>
      <div className={styles.asset}>
        <div
          className={styles.asset__setting}
          onClick={() => navigate(page === "main" ? "/setting" : "/main")}
        >
          {page === "main" ? (
            <SettingsApplicationsRounded
              fontSize="large"
              sx={{ color: "#fff" }}
            />
          ) : (
            <Apps fontSize="large" sx={{ color: "#fff" }} />
          )}
        </div>
        {expanded && (
          <div className={styles.asset__helpers}>
            <div
              className={styles.asset__helpers__icon}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
                window.location.reload();
              }}
            >
              <Logout sx={{ color: "#fff" }} fontSize="large" />
            </div>
            {/* <div className={styles.asset__helpers__icon}>
            <AddCircleOutlinedIcon sx={{ color: "#fff" }} fontSize="large" />
          </div> */}
            {/* <div className={styles.asset__helpers__icon}>
            <AddCircleOutlinedIcon sx={{ color: "#fff" }} fontSize="large" />
          </div> */}
            {/* <div className={styles.asset__helpers__icon}>
            <AddCircleOutlinedIcon sx={{ color: "#fff" }} fontSize="large" />
          </div> */}
          </div>
        )}
      </div>
    </SideNav>
  );
}
