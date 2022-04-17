export default {
  top: 0, // The initial ordinate of the added component
  zoom: 64, // Canvas zoom percentage
  type: 'page', // selected element type
  index: -1, // index of selected element
  uuid: null, // selected element uuid
  counter: 0, // Counter used to avoid duplicate names when renaming containers

  originX: 0, // Horizontal initial value of selected components
  originY: 0, // Vertical initial value of selected components
  startX: 0, // The abscissa when the mouse is pressed
  startY: 0, // The vertical coordinate when the mouse is pressed
  moving: false, // Whether the component is being moved (the guides are only displayed when the component is moved)

  animation: [], // Animation library
  playState: false, // animation playback status

  activeElement: {}, // The selected object, either a component or a page
  page: {
    page: true,
    title: 'testDoc', //  title
    height: 1500, // canvas height
    backgroundColor: '#fff'
  },
  widgets: [] // element
}
