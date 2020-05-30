// @flow
import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { TwitterPicker } from 'react-color';
import {
  CollectionIcon,
  AcademicCapIcon,
  BeakerIcon,
  BuildingBlocksIcon,
  CloudIcon,
  CodeIcon,
  EditIcon,
  EyeIcon,
  PadlockIcon,
  PaletteIcon,
  MoonIcon,
  SunIcon,
} from 'outline-icons';
import styled from 'styled-components';
import { LabelText } from 'components/Input';
import { DropdownMenu } from 'components/DropdownMenu';
import NudeButton from 'components/NudeButton';
import Flex from 'shared/components/Flex';

export const icons = {
  collection: {
    component: CollectionIcon,
    keywords: 'collection',
  },
  academicCap: {
    component: AcademicCapIcon,
    keywords: 'learn teach lesson guide',
  },
  beaker: {
    component: BeakerIcon,
    keywords: 'lab research',
  },
  buildingBlocks: {
    component: BuildingBlocksIcon,
    keywords: 'app blocks',
  },
  cloud: {
    component: CloudIcon,
    keywords: 'cloud service',
  },
  code: {
    component: CodeIcon,
    keywords: 'developer api code',
  },
  eye: {
    component: EyeIcon,
    keywords: 'eye view',
  },
  padlock: {
    component: PadlockIcon,
    keywords: 'padlock private',
  },
  palette: {
    component: PaletteIcon,
    keywords: 'design palette art brand',
  },
  pencil: {
    component: EditIcon,
    keywords: 'copy writing post',
  },
  moon: {
    component: MoonIcon,
    keywords: 'night moon',
  },
  sun: {
    component: SunIcon,
    keywords: 'day sun',
  },
};

const colors = [
  '#4E5C6E',
  '#0366d6',
  '#7F6BFF',
  '#E76F51',
  '#FC2D2D',
  '#FFBE0B',
  '#2A9D8F',
  '#00D084',
  '#EE84F0',
  '#2F362F',
];

type Props = {
  onChange: (color: string, icon: string) => void,
  icon: string,
  color: string,
};

function preventEventBubble(event) {
  event.stopPropagation();
}

@observer
class IconPicker extends React.Component<Props> {
  @observable isOpen: boolean = false;
  node: ?HTMLElement;

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleClose = () => {
    this.isOpen = false;
  };

  handleOpen = () => {
    this.isOpen = true;
  };

  handleClickOutside = (ev: SyntheticMouseEvent<>) => {
    // $FlowFixMe
    if (ev.target && this.node && this.node.contains(ev.target)) {
      return;
    }

    this.handleClose();
  };

  render() {
    const Component = icons[this.props.icon || 'collection'].component;

    return (
      <Wrapper ref={ref => (this.node = ref)}>
        <label>
          <LabelText>Icon</LabelText>
        </label>
        <DropdownMenu
          label={
            <LabelButton>
              <Component role="button" color={this.props.color} size={30} />
            </LabelButton>
          }
        >
          <Icons onClick={preventEventBubble}>
            {Object.keys(icons).map(name => {
              const Component = icons[name].component;
              return (
                <IconButton
                  key={name}
                  onClick={() => this.props.onChange(this.props.color, name)}
                  style={{ width: 30, height: 30 }}
                >
                  <Component color={this.props.color} size={30} />
                </IconButton>
              );
            })}
          </Icons>
          <Flex onClick={preventEventBubble}>
            <ColorPicker
              color={this.props.color}
              onChange={color =>
                this.props.onChange(color.hex, this.props.icon)
              }
              colors={colors}
              triangle="hide"
            />
          </Flex>
        </DropdownMenu>
      </Wrapper>
    );
  }
}

const Icons = styled.div`
  padding: 15px 9px 9px 15px;
  width: 276px;
`;

const LabelButton = styled(NudeButton)`
  border: 1px solid ${props => props.theme.inputBorder};
  width: 32px;
  height: 32px;
`;

const IconButton = styled(NudeButton)`
  border-radius: 4px;
  margin: 0px 6px 6px 0px;
  width: 30px;
  height: 30px;
`;

const ColorPicker = styled(TwitterPicker)`
  box-shadow: none !important;
  background: transparent !important;
`;

const Wrapper = styled('div')`
  display: inline-block;
  position: relative;
`;

export default IconPicker;
