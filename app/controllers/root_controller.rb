class RootController < ApplicationController
  def root
    @words = Oj.dump(Word.all.order(id: :asc).as_json)
  end
end
