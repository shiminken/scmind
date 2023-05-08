"use client";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
  QqCircleFilled,
} from "@ant-design/icons";
import { Layout, Menu, DatePicker, Button, Spin } from "antd";
import React, { useState } from "react";
const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;

import styles from "./page.module.css";
import { useDaily } from "@/hooks/useDaily";
import { convertDateTimeToUnix, getDatesBetween } from "@/helpers/time";
import dayjs from "dayjs";
import Pager from "@/components/Pager/Pager";
const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

const Statistics = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [missingDailyMem, setMissingDailyMem] = useState<any>();
  const [dayDiffs, setDayDiffs] = useState<any[]>([]);
  const [missingLoading, setMissingLoading] = useState<boolean>(false);
  const { fetchMissingDailyMem } = useDaily();


  const _triggerMissingDailyMemAPI = async (startDate: any, endDate: any) => {
    try {
      setMissingLoading(true);

    const oldestUnix = convertDateTimeToUnix(
     startDate,
      "06:00"
    );
    const newestUnix = convertDateTimeToUnix(
     endDate,
      "23:59"
    );


    const response = await fetchMissingDailyMem(oldestUnix, newestUnix);

    if (response) {
      setMissingDailyMem(response);
    }
    } catch (error) {
      console.log(error)
    } finally {
      setMissingLoading(false)
    }
  }

  const getchMissingDailyMem = async () => {
    const [start, end] = dateRange;
    const dayDiffRange = getDatesBetween(start, end);
    setDayDiffs(dayDiffRange);

    await  _triggerMissingDailyMemAPI(dayDiffRange[0], dayDiffRange[0])

  };

  const _renderDatePicker = () => {
    return (
      <div className={styles.datePickerWrapper}>
        <RangePicker
          onChange={(val: any) => setDateRange(val)}
          format={"MM/DD/YYYY"}
        />
        <Button
          type="primary"
          className={styles.generateBtn}
          onClick={getchMissingDailyMem}
        >
          Counting
        </Button>
      </div>
    );
  };

  const _renderChart = () => {
    return <div>CHART GOES HERE</div>;
  };

  const _renderMissingDailyMem = () => {

    if (dayDiffs?.length) {
      return (
        <div>
          <Pager
            items={dayDiffs}
            onChange={async (selectedItem: number) => {
              const selectedDay = dayDiffs.filter(
                (item, index) => index === selectedItem
              )?.[0];
             await _triggerMissingDailyMemAPI(selectedDay, selectedDay)
            }}
          />

          <div>
             {missingLoading && <Spin style={{
                marginTop: 20,
                marginLeft: "50%",
              }}/>}
            {missingDailyMem?.missingMembers?.length ? (<h2 style={{marginTop: 20}}>
              {missingDailyMem?.missingMembers?.length} members
            </h2>) : null}

            {missingDailyMem?.missingMembers?.length ?
              missingDailyMem?.missingMembers?.map((item: any) => {
                return (
                  <div key={item.id} className={styles.memberWrapper}>
                    <QqCircleFilled className={styles.userIcon} />
                    <span className={styles.userMissing}>{item.name}</span>
                  </div>
                );
              }) : null}

          </div>
        </div>
      );
    }
  };

  const _renderStatisticDetail = () => {
    return (
      <div className={styles.statisticDetailWrapper}>
        {_renderChart()}
        {_renderMissingDailyMem()}
      </div>
    );
  };

  const _renderDetailStatistics = () => {
    return (
      <div className={styles.statisticWrapper}>
        <h2>Leader Board</h2>
        {_renderStatisticDetail()}
      </div>
    );
  };

  const _renderContent = () => {
    return (
      <Content className={styles.contentLayoutWrapper}>
        {_renderDatePicker()}
        {_renderDetailStatistics()}
      </Content>
    );
  };

  return (
    <Layout className={styles.main}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {!collapsed && <div className={styles.logo}>SOURCECODE MIND</div>}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <BarChartOutlined />,
              label: "Daily Statistics",
            },
          ]}
        />
      </Sider>
      <Layout className={styles.siteLayoutWrapper}>
        <Header
          className={styles.siteLayout}
          style={{
            paddingLeft: 15,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        {_renderContent()}
      </Layout>
    </Layout>
  );
};

export default Statistics;
