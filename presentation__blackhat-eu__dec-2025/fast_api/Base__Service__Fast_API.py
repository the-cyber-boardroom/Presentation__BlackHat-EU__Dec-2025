from osbot_fast_api.api.routes.Routes__Set_Cookie            import Routes__Set_Cookie
from osbot_fast_api_serverless.fast_api.Serverless__Fast_API import Serverless__Fast_API
from osbot_fast_api_serverless.fast_api.routes.Routes__Info  import Routes__Info
from presentation__blackhat-eu__dec-2025.config                           import FAST_API__TITLE, FAST_API__DESCRIPTION
from presentation__blackhat-eu__dec-2025.utils.Version                    import version__presentation__blackhat-eu__dec-2025


class Base__Service__Fast_API(Serverless__Fast_API):
    name        = FAST_API__TITLE
    version     = version__presentation__blackhat-eu__dec-2025
    description = FAST_API__DESCRIPTION

    def setup_routes(self):
        self.add_routes(Routes__Info        )
        self.add_routes(Routes__Set_Cookie  )



