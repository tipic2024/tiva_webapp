import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CWidgetStatsD, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCalendar } from '@coreui/icons';
import { getAPICall } from '../../util/api';

const today = new Date();
const fulldate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
const Tomorrow = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate() + 1);

const WidgetsBrand = (props) => {
  const [todaysDeliveries, setTodaysDeliveries] = useState(0); // State to store today's deliveries count
  const [tomorrowsDeliveries, setTomorrowsDeliveries] = useState(0); // State to store today's deliveries count

  useEffect(() => {
    TodaysDeliveries(); // Fetch deliveries on component mount
    TomorrowsDeliveries();
    
  }, []);

  const TodaysDeliveries = async () => {
    try {
      const resp = await getAPICall(`/api/totalDeliveries?startDate=${fulldate}&endDate=${fulldate}`);
      const todaysCount = resp.length;
      setTodaysDeliveries(todaysCount); // Update state with today's deliveries count
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };
  const TomorrowsDeliveries = async () => {
    try {
      const resp = await getAPICall(`/api/totalDeliveries?startDate=${Tomorrow}&endDate=${Tomorrow}`);
      const tomorrowsCount = resp.length;
      setTomorrowsDeliveries(tomorrowsCount); // Update state with tomorrow's deliveries count
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={12} xl={12} xxl={12}>
        <CWidgetStatsD
          color="warning"
          icon={<CIcon icon={cilCalendar} height={20} className="my-4 text-white" />}
          values={[
            { title: 'Today', value: todaysDeliveries }, // Display today's deliveries count here
            { title: 'Tomorrow', value: tomorrowsDeliveries }, // Display tomorrow's deliveries count
          ]}
        >
          <h1 className='text-white'>Hello</h1> {/* Example of additional content */}
        </CWidgetStatsD>
      </CCol>
    </CRow>
  );
};

WidgetsBrand.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
};

export default WidgetsBrand;
