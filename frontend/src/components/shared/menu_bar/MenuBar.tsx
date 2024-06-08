import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanelProps } from './MenuBar.types';
import Home from '../../home/Home';
import ReadingList from '../../reading_list/ReadingList';

function AppTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`app-tabpanel-${index}`}
            aria-labelledby={`app-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `app-tab-${index}`,
        'aria-controls': `app-tabpanel-${index}`,
    };
}

export default function MenuBar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabElements = [
        {
            label: 'Books',
            component: <Home />
        },
        {
            label: 'Reading List',
            component: <ReadingList />
        }
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                <img src="/logo.svg"></img>
                <Tabs value={value} onChange={handleChange} aria-label="App Tabs">
                    {
                        tabElements.map((v, i) => (
                            <Tab label={v.label} {...a11yProps(i)} />
                        ))
                    }
                </Tabs>
            </Box>
            <AppTabPanel value={value} index={value} children={tabElements[value].component} />
        </Box>
    );
}