import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform
} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import RNDraftView from "react-native-draftjs-editor";

const ControlButton = ({ text, action, isActive }) => {
  return (
    <TouchableOpacity
      style={[
        styles.controlButtonContainer,
        isActive ? { backgroundColor: "gold" } : {}
      ]}
      onPress={action}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const EditorToolBar = ({
  activeStyles,
  blockType,
  toggleStyle,
  toggleBlockType
}) => {
  return (
    <View style={styles.toolbarContainer}>
      <ControlButton
        text={"B"}
        isActive={activeStyles.includes("BOLD")}
        action={() => toggleStyle("BOLD")}
      />
      <ControlButton
        text={"I"}
        isActive={activeStyles.includes("ITALIC")}
        action={() => toggleStyle("ITALIC")}
      />
      <ControlButton
        text={"H"}
        isActive={blockType === "header-one"}
        action={() => toggleBlockType("header-one")}
      />
      <ControlButton
        text={"ul"}
        isActive={blockType === "unordered-list-item"}
        action={() => toggleBlockType("unordered-list-item")}
      />
      <ControlButton
        text={"ol"}
        isActive={blockType === "ordered-list-item"}
        action={() => toggleBlockType("ordered-list-item")}
      />
      <ControlButton
        text={"--"}
        isActive={activeStyles.includes("STRIKETHROUGH")}
        action={() => toggleStyle("STRIKETHROUGH")}
      />
    </View>
  );
};

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through"
  }
};

const Editor = () => {
  const _draftRef = React.createRef();
  const [activeStyles, setActiveStyles] = useState([]);
  const [blockType, setActiveBlockType] = useState("unstyled");
  const [editorState, setEditorState] = useState("");

  const defaultValue ="";

  const editorLoaded = () => {
    _draftRef.current && _draftRef.current.focus();
  };

  const toggleStyle = style => {
    _draftRef.current && _draftRef.current.setStyle(style);
  };

  const toggleBlockType = blockType => {
    _draftRef.current && _draftRef.current.setBlockType(blockType);
  };

  useEffect(() => {
    /**
     * Get the current editor state in HTML.
     * Usually keep it in the submit or next action to get output after user has typed.
     */
    setEditorState(_draftRef.current ? _draftRef.current.getEditorState() : "");
  }, [_draftRef]);
  console.log(editorState);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={{height: 200, position: 'relative'}}>
        <View style={{height: 200}}>
          <RNDraftView
            style={styles.draftViewStyle}
            defaultValue={defaultValue}
            onEditorReady={editorLoaded}
            placeholder={"Add text here..."}
            ref={_draftRef}
            onStyleChanged={setActiveStyles}
            onBlockTypeChanged={setActiveBlockType}
            styleMap={styleMap}
            />
        </View>      
        <View style={styles.toolBarStyle}>
          <EditorToolBar
            activeStyles={activeStyles}
            blockType={blockType}
            toggleStyle={toggleStyle}
            toggleBlockType={toggleBlockType}
          />
        </View>
        {Platform.OS === "ios" ? <KeyboardSpacer /> : null}
      </View>            
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  draftViewStyle: {
    flex: 1,
    padding: 10
  },
  toolBarStyle: {
    position: 'absolute',
    // flex: 1,
    width: 390,
    bottom: 0,
    zIndex: 1
  },
  toolbarContainer: {
    height: 56,
    flexDirection: "row",
    backgroundColor: "silver",
    alignItems: "center",
    justifyContent: "space-around"
  },
  controlButtonContainer: {
    padding: 8,
    borderRadius: 2
  }
});

export default Editor;