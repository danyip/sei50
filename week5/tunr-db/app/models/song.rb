class Song < ApplicationRecord

  # We want to be able to create songs first, and later connect
  # them to their artist later, so we need the artist_id value
  # to be optional when we create a Song
  belongs_to :artist, optional: true


end
