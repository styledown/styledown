require './setup'

describe 'inline options', ->
  beforeEach ->
    @load '''
       # My guides
       hello

       # Styleguide options
       ### Head
           <script id="my-script" src="hello.js"></script>
       ### Body
           <div sg-content id="my-body">
    '''


  it 'no errors', ->

  it 'should remove config blocks', ->
    expect(@$('h2#styleguide-options')).have.length 0

  it 'should have not much', ->
    expect(@$('body').text().trim()).eql "My guides\nhello"

  it 'should render with correct body', ->
    expect(@$('#my-body')).have.length 1

  it 'should render with correct head', ->
    expect(@$('#my-script')).have.length 1



