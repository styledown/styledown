module Styledown
  extend self

  def context
    @context ||= begin
      require 'execjs'
      fn = File.expand_path('../styledown.js', __FILE__)
      ExecJS.compile(File.read(fn))
    end
  end

  def parse(code, options={})
    context.call('Styledown.parse', code, options)
  end
end
