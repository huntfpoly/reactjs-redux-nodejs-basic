import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@material-ui/core';

// project imports
import config from './../../../config';
import Logo from '../../../components/Logo';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {
    return (
        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
            <Typography variant="h1" color="primary">
                hieupv
            </Typography>
        </ButtonBase>
    );
};

export default LogoSection;
