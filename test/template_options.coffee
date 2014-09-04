describe 'Template', ->
  beforeEach ->
    @load '''
       # My guides
       hello

       # Styleguide options
       ### Template
           <!doctype html>
           <html>
             <woop>
             <head></head>
             <body></body>
           </html>
       ### Head
           <meta>
    '''

  it 'renders the template', ->
    expect(@html).include '<woop>'
