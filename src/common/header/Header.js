import React, { Component } from 'react';
import './Header.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { withRouter} from 'react-router-dom';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));


 const StyledMenuItem = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

class Header extends Component {

    // const [anchorEl, setAnchorEl] = React.useState(null);
    constructor(props) {
        super(props);
        // this.handleClose = this.handleClose.bind(this);
        this.state = {
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
            accessToken : '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784',
            open: false,
            anchorEl: null,
        };
        console.log('Header Props::', this.props);
    }

    

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    
    handleClose = (purpose, e) => {
        if( purpose === 'profile'){
            this.props.history.push("/profile");
        } else if( purpose === 'logout') {
            sessionStorage.clear();
            this.props.history.push("/");
        } 
        this.setState({ anchorEl: null });
        
    };

    
    render() {  
        
        return(
            <div>
                <header className="app-header">
                    <div className="app-logo">Image Viewer</div>
                    {this.props.profileIcon === "true" && this.state.loggedIn ?
                        <div className="showprofile-icon">
                            <Avatar 
                                alt={this.state.profileUserName} 
                                src={this.props.profilePicture}  
                                className="avatar" 
                                onClick={this.handleClick}
                                aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"/>
                            <StyledMenu id="simple-menu" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this,'')}>
                                  
                                { this.props.match.path !=="/profile" ? 
                                <StyledMenuItem onClick={this.handleClose.bind(this,'profile')}>
                                <ListItemText primary="Profile" />
                                </StyledMenuItem> : "" }
                                <StyledMenuItem onClick={this.handleClose.bind(this, 'logout')}>
                                <ListItemText primary="Logout" />
                                </StyledMenuItem> 
                            </StyledMenu>
                        </div> : ""}
                </header>
            </div>
        )
    }
}

export default withRouter(Header);