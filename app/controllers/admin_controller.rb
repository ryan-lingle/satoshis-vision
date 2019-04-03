class AdminController < ApplicationController
  def edits
    @count = Edit.count
    @edits = Edit.all.order(created_at: :desc)
  end
end
