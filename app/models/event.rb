class Event < ApplicationRecord
  validates :title, :start, :end, presence: true
  # belongs_to :user
end
