/** @jsxImportSource @emotion/react */
import AppLayout from "../components/AppLayout";
import React, { useMemo } from "react";
import wrapper from "../store";
import { List, Select, Divider } from "antd";
import { BackTop } from "antd";
//import PortfolioCard from "../components/Portfolo/PortfolioCard";
import PortfolioCard from "../components/Common/PortfolioCard";
import PorfolioSearch from "../components/Portfolo/PorfolioSearch";
import { loadPortfolios } from "../actions/portfolio";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { myinfo } from "../actions/user";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPortfolios, hasMorePortfolios, loadPortfoliosLoading } = useSelector(
    (state) => state.portfolio,
  );
  console.log(me);
  console.log(mainPortfolios);

  const { Option } = Select;
  const portfolioSearchObjects = useMemo(() => {
    const orderBys = [
      <Option key={"추천 순"}>추천 순</Option>,
      <Option key={"최신 순"}>최신 순</Option>,
      <Option key={"댓글 순"}>댓글 순</Option>,
      <Option key={"스크랩 순"}>스크랩 순</Option>,
    ];
    return {
      orderBys,
    };
  }, []);

  return (
    <AppLayout>
      <div css={mainContainer}>
        <PorfolioSearch {...portfolioSearchObjects} />
        <Divider css={dividerCss} />
        {/* <div css={portfolioContainer}>
          {mainPortfolios.map((portfolio) => (
            <PortfolioCard {...portfolio} />
          ))}
        </div> */}
        <List
          grid={{
            gutter: 18,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={mainPortfolios}
          renderItem={(item) => {
            return (
              <List.Item>
                <PortfolioCard {...item} />
              </List.Item>
            );
          }}
        />
      </div>
      <BackTop />
    </AppLayout>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
  axios.defaults.headers.Cookie = ""; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(loadPortfolios());
  await store.dispatch(myinfo());
  return {
    props: {},
  };
});

export default Home;

const mainContainer = css``;
const dividerCss = css`
  margin-top: 13px;
  margin-bottom: 15;
`;

const portfolioContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  & * {
    margin: 0;
  }
`;
