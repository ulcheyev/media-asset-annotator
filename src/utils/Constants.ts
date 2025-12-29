export class Constants {
  // Media types
  static VIDEO_ASSET_TYPE_LABEL = 'video';
  static IMAGE_ASSET_TYPE_LABEL = 'image';

  //Annotation types
  static POLYLINE_TYPE_LABEL = 'polyline';
  static TEXT_TYPE_LABEL = 'text';

  // Tool
  static DEFAULT_SCENE_WIDTH = 960;
  static DEFAULT_SCENE_HEIGHT = 540;
  static SELECT_TOOL_LABEL = 'select';
  static SAVE_BUTTON_TEXT_LABEL = 'Save';
  static RECT_TYPE_TOOL_LABEL: 'rect';
  static EDIT_BUTTON_TOOL_LABEL: 'Edit';

  // Text
  static TEXT_DEFAULT_FONT_SIZE = 12;
  static TEXT_DEFAULT_COLOR = 'white';
  static TEXT_DEFAULT_STROKE_WIDTH = 200;
  static TEXT_DEFAULT_OPACITY = 0;
  static TEXT_DEFAULT_FILL = 'none';

  // Polyline
  static POLYLINE_DEFAULT_COLOR = 'red';
  static POLYLINE_DEFAULT_STROKE_WIDTH = 12;
  static POLYLINE_DEFAULT_OPACITY = 0;
  static POLYLINE_DEFAULT_FILL = 'none';

  // Styles
  static SELECTED_ANNOTATION_BLUR_COLOR = '#0022ff';
  static SELECTED_POLYLINE_ANNOTATION_DASH_PARAMETER = [4, 0.5];
  static SELECTED_ANNOTATION_BLUR = 3;
}
